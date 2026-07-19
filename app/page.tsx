import Form from "./components/Form";

export default function Home() {
    return (
        <div className="flex h-screen w-screen bg-parchment p-10">
            <Form />
            <div className="flex flex-col flex-1 bg-slate-600 justify-items-center w-full p-5">
                <h1 className="bg-dust-grey w-full p-10 text-4xl font-bold">
                    Health Analysis
                </h1>
                <div>
                    <div>Weekly client summary</div>
                    <div>Nutrition adherence</div>
                    <div>sleep</div>
                    <div>Water intake</div>
                    <div>Symptoms / Stress</div>
                    <div>Engagement Level</div>
                    <div>Key barriers</div>
                    <div>Pending Actions</div>
                    <div>Risks / attention flags</div>
                    <div>Recommended next action for the coach</div>
                    <div>
                        Supporting evidence from the original conversation
                    </div>
                    <div>
                        Human review option such as Approve / Edit / Reject
                    </div>
                </div>
            </div>
        </div>
    );
}
