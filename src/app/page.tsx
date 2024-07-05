"use client";
import { getNotes } from "@/services/index.service";
import withAuth from "@/guards/withAuth";
import Notes from "@/Components/Notes";

const Home = async () => {

    const notes = await getNotes();

    return (
        <div>

            <Notes notes={notes} />
        </div>
    )
};

export default withAuth(Home);