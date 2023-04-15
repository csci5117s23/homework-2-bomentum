import { use, useState } from "react"

export default function Details() {
    const [loading, setLoading] = useState(true);

   

    if (loading) {
        return <span>loading .....</span>
    }
    else {
        return
        <><h1>Finish Me</h1></>
    }
}