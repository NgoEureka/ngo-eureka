import mongoose from "mongoose";

    export interface News  {
        _id: mongoose.Types.ObjectId;
        title: string;
        description: string;
        place: string;
        category: string;
        imageUrl: string;
        createdAt: Date;
        updatedAt: Date;
    }

    const NewsSchema = new mongoose.Schema<News>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        place: { type: String, required: true },
        category: { type: String, required: true },
        imageUrl: { type: String, required: true },
    },
    { timestamps: true },
    );

    const NewsModel = mongoose.models.News ||
    mongoose.model<News>("News", NewsSchema);

    export default NewsModel