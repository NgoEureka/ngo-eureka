import mongoose from "mongoose";

    export interface Timeline  {
        _id: mongoose.Types.ObjectId;
        timeline: string;
    }

    const timelineSchema = new mongoose.Schema<Timeline>(
    {
        timeline: { type: String },
    },
    );

    const TimelineModel = mongoose.models.Timelines ||
    mongoose.model<Timeline>("Timelines", timelineSchema);

    export default TimelineModel