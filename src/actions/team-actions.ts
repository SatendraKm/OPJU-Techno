"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { ITeam, Team } from "@/models/team.model";
import { Event, IEvent } from "@/models/event.model";
import { User } from "@/models/user.model";
import { IInvitation, Invitation } from "@/models/invitation.model";
import { getUser } from "./user-actions";

export async function getTeamDetailsAction(teamId: string) {
  try {
    await connectToDatabase();

    // Query your database to get:
    // 1. Team details
    const team = await Team.findById(teamId);
    if (!team) {
      throw new Error(`Team with ID ${teamId} not found`);
    }

    // 2. Event details
    const event = await Event.findById(team.event);
    if (!event) {
      throw new Error(`Event with ID ${team.event} not found`);
    }

    // 3. Member details
    const members = await User.find({
      email: { $in: team.members },
    });

    // 4. Pending invites
    const invites = await Invitation.find({ teamId: team._id });

    return JSON.parse(
      JSON.stringify({
        team,
        event,
        members,
        invites,
      }),
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get team details: ${error.message}`);
    } else {
      throw new Error("Failed to get team details due to an unknown error");
    }
  }
}

export async function getParticipatingTeams() {
  try {
    await connectToDatabase();

    const user = await getUser();
    if (!user) {
      throw new Error("User not found");
    }

    const teams = await Team.find({ members: user.email }).lean<ITeam[]>();

    // Fetch leader and event details manually
    const populatedTeams = await Promise.all(
      teams.map(async (team) => {
        const leader = await User.findOne({
          email: team.leader,
        })
          .select("fullName email isOutsider")
          .lean<{ fullName: string; email: string; isOutsider: boolean }>();
        const event = await Event.findById(team.event)
          .select("name")
          .lean<{ name: string }>();
        const members = await User.find({
          email: { $in: team.members },
        })
          .select("fullName email isOutsider")
          .lean<{ fullName: string; email: string; isOutsider: boolean }[]>();
        const individualSchema = team.members.length == 1 && leader?.isOutsider;
        return {
          ...team,
          members,
          leader,
          event,
          individualSchema,
        };
      }),
    );

    return JSON.parse(JSON.stringify(populatedTeams));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch participating teams: ${error.message}`);
    } else {
      throw new Error(
        "Failed to fetch participating teams due to an unknown error",
      );
    }
  }
}

export async function getInvitedTeams() {
  try {
    await connectToDatabase();

    const user = await getUser();
    if (!user) {
      throw new Error("User not found");
    }

    const invites = await Invitation.find({
      inviteeEmail: user.email,
    }).lean<IInvitation[]>();

    // Fetch team, leader, and event details manually
    const populatedInvites = await Promise.all(
      invites.map(async (invite) => {
        const team = await Team.findById(invite.teamId).lean<ITeam>();
        const members = await User.find({
          email: { $in: team?.members },
        }).select("fullName email");
        if (team) {
          team.members = members;
        }
        const leader = await User.findOne({
          email: team?.leader,
        }).select("fullName email");
        const event = await Event.findById(team?.event).lean<IEvent>();
        return {
          ...invite,
          team: {
            ...team,
            leader,
            event,
          },
        };
      }),
    );

    return JSON.parse(JSON.stringify(populatedInvites));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch invited teams: ${error.message}`);
    } else {
      throw new Error("Failed to fetch invited teams due to an unknown error");
    }
  }
}

export async function deleteTeamAction(teamId: string) {
  try {
    await connectToDatabase();

    // 1. Get current user
    const user = await getUser();
    if (!user) {
      throw new Error("User not found");
    }

    // 2. Find and validate team
    const team = await Team.findById(teamId);
    if (!team) {
      throw new Error(`Team with ID ${teamId} not found`);
    }

    // 3. Verify user is the team leader
    if (team.leader !== user.email) {
      throw new Error("Only the team leader can delete teams");
    }

    // 4. Remove teamId from all team members' teams arrays
    await User.updateMany(
      { email: { $in: team.members } },
      { $pull: { teams: teamId } },
    );

    // 5. Delete all invitations associated with this team
    await Invitation.deleteMany({ teamId: teamId });

    // 6. Delete the team
    await Team.findByIdAndDelete(teamId);

    return JSON.parse(
      JSON.stringify({
        success: true,
        deletedTeamId: teamId,
      }),
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to delete team: ${error.message}`);
    } else {
      throw new Error("Failed to delete team due to an unknown error");
    }
  }
}
