import dbConnect from "@/lib/dbConnect"
import LiveModel from "@/models/LiveModel";
import { NextRequest, NextResponse } from "next/server"

export const GET = async () => {
    try {
        await dbConnect();
        const teams = await LiveModel.find();
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
        const res = await LiveModel.create(data);
        if(!res) return NextResponse.json({ success: false, msg: 'Match not created' }, { status: 404 });
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
        const id = data._id.toString();
        if (!id) {
            return NextResponse.json({ success: false, msg: 'ID is required' }, { status: 400 });
        }

        const result = await LiveModel.findByIdAndUpdate(id, data);
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

        const result = await LiveModel.findByIdAndDelete(id);
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