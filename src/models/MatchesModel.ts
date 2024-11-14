import mongoose from "mongoose";

    export interface Match  {
        _id: mongoose.Types.ObjectId;
        teamA: string;
        teamB: string;
        teamALogo: string;
        teamBLogo: string;
        teamAScore: string;
        teamBScore: string;
        overs: string;
        date: string;
        time: string;
        status: string;
        isLive: boolean;
        isBreak: boolean;
        isABowling: boolean;
    }

    const MatchesSchema = new mongoose.Schema<Match>(
    {
        teamA: { type: String, required: true },
        teamB: { type: String, required: true },
        teamALogo: { type: String},
        teamBLogo: { type: String},
        teamAScore: { type: String, default: "0/0" },
        teamBScore: { type: String, default: "0/0" },
        overs: { type: String, required: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
        status: { type: String, required: true },
        isLive: { type: Boolean, default: false },
        isBreak: { type: Boolean, default: false },
        isABowling: { type: Boolean, default: false },
    },
    );

    const MatchesModel = mongoose.models.Matches ||
    mongoose.model<Match>("Matches", MatchesSchema);

    export default MatchesModel