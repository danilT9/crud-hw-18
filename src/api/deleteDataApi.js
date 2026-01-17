export const deleteDataApi = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/students/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        });
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("deleteDataApi:", error.message);
    }
}