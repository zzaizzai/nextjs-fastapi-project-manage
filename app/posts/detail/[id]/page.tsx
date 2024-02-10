import { sql } from "@vercel/postgres";
import { redirect } from 'next/navigation'


export const dynamic = 'force-dynamic'


export default async function PostDetail(props: any) {
    const { rows } = await sql`
        select * from posts where id = ${props.params.id} limit 1;
    `
    const item = rows[0]

    if (!item) {
        console.log('no item')
        redirect('/posts')
    }

    return (
        <table className="m-5">
            <tr>
                <th>ID</th>
                <td>{item.id ?? 'id'}</td>
            </tr>
            <tr>
                <th>Title</th>
                <td>{item.title ?? 'title'}</td>
            </tr>
            <tr>
                <th>Content</th>
                <td>{item.content ?? 'content'}</td>
            </tr>
        </table>
    );
}
