import dotenv from "dotenv";
import mongoose from "mongoose";
import { createObjectCsvWriter } from "csv-writer";

dotenv.config();

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB Connected");
}

async function exportParticipants() {
  const db = mongoose.connection;

  // Step 1: Find all outsiders with fully cleared payment
  const paidOutsiders = await db
    .collection("users")
    .aggregate([
      { $match: { isOutsider: true } },
      {
        $lookup: {
          from: "transactions",
          localField: "email",
          foreignField: "userEmail",
          as: "transactions",
        },
      },
      {
        $match: {
          transactions: {
            $elemMatch: {
              acknowledgementByAdmin: true,
              clearanceApproval: true,
            },
          },
        },
      },
      { $project: { email: 1, teams: 1 } },
    ])
    .toArray();

  if (paidOutsiders.length === 0) {
    console.log("⚠️  No paid outsiders found.");
    process.exit(0);
  }

  // Step 2: Collect all team ObjectIds across all paid outsiders
  const allTeamIds = paidOutsiders.flatMap((u) => u.teams || []);

  // Step 3: Fetch all those teams
  const teams = await db
    .collection("teams")
    .find({
      _id: { $in: allTeamIds },
    })
    .toArray();

  // Step 4: Collect all unique member emails across all teams
  const uniqueEmails = [...new Set(teams.flatMap((t) => t.members || []))];

  // Step 5: Fetch user info for each unique member
  const memberUsers = await db
    .collection("users")
    .find({
      email: { $in: uniqueEmails },
    })
    .toArray();

  // Index users by email for quick lookup
  const userByEmail = Object.fromEntries(memberUsers.map((u) => [u.email, u]));

  // Step 6: Build one row per unique participant
  const records = uniqueEmails.map((email) => {
    const user = userByEmail[email];
    if (!user) {
      // Member exists in team but has no user doc (edge case)
      return {
        fullName: "Unknown",
        email: email,
        enrollmentNumber: "N/A",
        mobileNumber: "N/A",
        branch: "N/A",
        isOutsider: "N/A",
      };
    }
    return {
      fullName: user.fullName || "N/A",
      email: user.email,
      enrollmentNumber: user.enrollmentNumber || "N/A",
      mobileNumber: user.mobileNumber || "N/A",
      branch: user.branch || "N/A",
      isOutsider: user.isOutsider ? "Yes" : "No",
    };
  });

  // Sort: outsiders first, then alphabetically by name
  records.sort((a, b) => {
    if (a.isOutsider !== b.isOutsider) return a.isOutsider === "Yes" ? -1 : 1;
    return a.fullName.localeCompare(b.fullName);
  });

  const csvWriter = createObjectCsvWriter({
    path: "all_participants.csv",
    header: [
      { id: "fullName", title: "Full Name" },
      { id: "email", title: "Email" },
      { id: "enrollmentNumber", title: "Enrollment Number" },
      { id: "mobileNumber", title: "Mobile Number" },
      { id: "branch", title: "Branch" },
      { id: "isOutsider", title: "Is Outsider" },
    ],
  });

  await csvWriter.writeRecords(records);
  console.log(
    `✅ Export Complete → all_participants.csv (${records.length} unique participants)`,
  );
  process.exit(0);
}

connectDB()
  .then(exportParticipants)
  .catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
