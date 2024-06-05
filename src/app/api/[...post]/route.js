import { NextResponse } from "next/server";

export const GET = (request, content) => {
  try {
    const postData = content.params.post;

    return NextResponse.json(postData);
  } catch (error) {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
};
