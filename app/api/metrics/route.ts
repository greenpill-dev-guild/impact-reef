import {readFile} from 'fs/promises';
import path from 'path';
import {NextResponse} from "next/server";

export const GET = async (request: Request) => {
    const jsonFilePath = path.join(process.cwd(), 'public', 'impact_metrics.json');

    try {
        const jsonData = await readFile(jsonFilePath, 'utf8');

        console.log(jsonData);

        const dataWithID = JSON.parse(jsonData).map((data: any, index: number) => {
            return {
                id: index,
                ...data,
            };
        });

        let response = NextResponse.json(dataWithID);
        response.headers.set('X-Total-Count', dataWithID.length.toString());
        return response;
    } catch (error) {
        return new Response(JSON.stringify({error: 'Failed to read the file'}), {
            headers: {
                'content-type': 'application/json',
            },
            status: 500,

        });
    }
}

