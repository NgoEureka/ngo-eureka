import dbConnect from "@/lib/dbConnect"
import MatchesModel from "@/models/MatchesModel";
import { NextRequest, NextResponse } from "next/server"

export const GET = async () => {
    try {
        await dbConnect();
        const teams = await MatchesModel.find();
        return NextResponse.json({success: true,data:[...teams]});
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            msg: error.message,
        }, {
            status: 400
        });
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const data = await request.json();
        const res = await MatchesModel.create(data);
        return NextResponse.json({
            success: true
        }, {
            status: 201
        });
    } catch (error: any) {

        return NextResponse.json({
            success: false,
            msg: error.message,
        }, {
            status: 400
        });
    }
}

export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const data = await request.json();
        const id = data._id;
        if (!id) {
            return NextResponse.json({ success: false, msg: 'ID is required' }, { status: 400 });
        }

        const result = await MatchesModel.findByIdAndUpdate(id, data);
        if (!result) {
            return NextResponse.json({ success: false, msg: 'Match not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true
        }, {
            status: 200
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            msg: error.message,
        }, {
            status: 400
        });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const data = await request.json();
        const id = data._id;
        if (!id) {
            return NextResponse.json({ success: false, msg: 'ID is required' }, { status: 400 });
        }

        const result = await MatchesModel.findByIdAndDelete(id);
        if (!result) {
            return NextResponse.json({ success: false, msg: 'Match not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true
        }, {
            status: 200
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            msg: error.message,
        }, {
            status: 400
        });
    }
}