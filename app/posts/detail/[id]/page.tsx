import { sql } from "@vercel/postgres";


export default async function PostDetail(props: any) {

    const { rows } = await sql`
        select * from posts where id = ${props.params.id} limit 1;
    `
    const item = rows[0]

    return (
        <div className="m-5">
            detail page
            <div>{item.id ?? 'id'}</div>
            <div>{item.title ?? 'title'}</div>
            <div>{item.content ?? 'content'}</div>
        </div>
    );
}
