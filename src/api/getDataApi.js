export const getDataApi = async () => {
    try {
        const res = await fetch("http://localhost:3000/students");
        const students = await res.json();
        return students;
    } catch (error) {
        console.log("getDataApi:", error.message);
        return [];
    }
}