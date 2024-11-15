import mongoose from "mongoose";

    export interface LiveMatch  {
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
        ytLink: string;
        status: string;
        isLive: boolean;
        isBreak: boolean;
        isABowling: boolean;
    }

    const LiveSchema = new mongoose.Schema<LiveMatch>(
    {
        teamA: { type: String, required: true },
        teamB: { type: String, required: true },
        teamALogo: { type: String},
        teamBLogo: { type: String},
        teamAScore: { type: String, default: "0/0" },
        teamBScore: { type: String, default: "0/0" },
        overs: { type: String, default: "0.0" },
        date: { type: String, required: true },
        time: { type: String, required: true },
        ytLink: { type: String },
        status: { type: String, default: "Match is yet to start" },
        isLive: { type: Boolean, default: false },
        isBreak: { type: Boolean, default: false },
        isABowling: { type: Boolean, default: false },
    },
    );

    const LiveModel = mongoose.models.Lives ||
    mongoose.model<LiveMatch>("Lives", LiveSchema);

    export default LiveModel