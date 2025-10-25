export async function fetchSongs(){
    const response = await fetch('http://localhost:3005/api/fetchSongs');
    const data = response.data;
    console.log(data);
}