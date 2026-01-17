export const updateDataApi = async (id, data) => {
    try {
        const res = await fetch(`http://localhost:3000/students/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify(data)
        });
        const student = await res.json();
        return student;
    } catch (error) {
        console.log("updateDataApi:", error.message);
    }
}