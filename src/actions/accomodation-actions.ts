"use server";
import { connectToDatabase } from "@/lib/mongodb";
import { Accommodation, IAccommodation } from "@/models/accomodation.model";
import { getUser } from "./user-actions";
import { IUser, User } from "@/models/user.model";
import { ITeam, Team } from "@/models/team.model";

export async function getAccommodationDetailsAction(): Promise<IAccommodation | null> {
  try {
    await connectToDatabase();

    const user = await getUser();
    if (!user) {
      throw new Error("User not found");
    }

    const accommodation = await Accommodation.findOne({
      userId: user?._id,
    }).lean<IAccommodation>();
    return JSON.parse(JSON.stringify(accommodation));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to fetch accommodation details: ${error.message}`
      );
    } else {
      throw new Error("Failed to fetch accommodation details");
    }
  }
}

interface AccommodationDetails {
  userId: string;
  arrivalTime: Date;
  departureTime: Date;
  additionalDetails?: string;
  universityName: string; // New required field
  gender: "Male" | "Female" | "Other"; // New required field with restricted values
}

export async function setAccommodationDetailsAction(
  details: AccommodationDetails
): Promise<IAccommodation> {
  try {
    await connectToDatabase();
    let accommodation = await Accommodation.findOne({
      userId: details.userId,
    });

    if (accommodation) {
      // Update existing accommodation
      accommodation.arrivalTime = details.arrivalTime;
      accommodation.departureTime = details.departureTime;
      accommodation.additionalDetails =
        details.additionalDetails || accommodation.additionalDetails;
      accommodation.universityName = details.universityName;
      accommodation.gender = details.gender;
      await accommodation.save();
    } else {
      // Create new accommodation with all required fields
      accommodation = new Accommodation(details);
      await accommodation.save();
    }

    return JSON.parse(JSON.stringify(accommodation));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to set accommodation details: ${error.message}`);
    } else {
      throw new Error("Failed to set accommodation details");
    }
  }
}

interface AccommodationWithUser {
  user: IUser;
  accommodation: IAccommodation;
  leaders: string[];
}

export async function getAllAccommodationsWithUsers(): Promise<
  AccommodationWithUser[]
> {
  try {
    await connectToDatabase();
    const accommodations = await Accommodation.find().lean<IAccommodation[]>();
    const userIds = accommodations.map((accommodation) => accommodation.userId);
    const users = await User.find({ _id: { $in: userIds } }).lean<IUser[]>();

    const accommodationsWithUsers = await Promise.all(
      accommodations.map(async (accommodation) => {
        const user = users.find((user) =>
          user._id.equals(accommodation.userId)
        );

        if (!user) {
          return { user: null, accommodation, leaders: [] };
        }

        // Fetch teams where the user is a member
        const teams = await Team.find({ members: user.email }).lean<ITeam[]>();

        // Get all leaders of those teams
        const leaders = Array.from(new Set(teams.map((team) => team.leader)));

        return {
          user,
          accommodation,
          leaders: leaders.filter((email) => email),
        };
      })
    );

    return JSON.parse(JSON.stringify(accommodationsWithUsers));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch accommodations: ${error.message}`);
    } else {
      throw new Error("Failed to fetch accommodations");
    }
  }
}
