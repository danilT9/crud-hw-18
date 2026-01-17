export const addDataApi = async (data) => {
    try {
        const res = await fetch("http://localhost:3000/students", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify(data)
        });
        const student = await res.json();
        return student;
    } catch (error) {
        console.log("addDataApi:", error.message);
    }
}