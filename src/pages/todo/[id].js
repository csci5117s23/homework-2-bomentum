import Link from "next/link";
import { useRouter } from "next/router";

export default function Id() {
    const router = useRouter();
    const { id } = router.query;

    if (id) {
        return (
            <div>
                <p>To do for id # {id}</p>
                <Link href='/todos'>To Do</Link>
            </div>
        );
    } else {
        return <></>;
    }
}
