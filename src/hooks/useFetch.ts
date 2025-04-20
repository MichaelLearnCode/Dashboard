import axiosApi from "@/services/api/axiosApi";
import { useState, useEffect } from "react";

function useFetch<T>(path: string){
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<T[]>([]);
    async function fetchData(){
        setIsLoading(true);
        const response = await axiosApi.get(path);
        setIsLoading(false);
        setData(response.data as T[]); 
    }
    useEffect(()=>{
        fetchData();
    },[]);
    return {data, isLoading, setData}
}

export default useFetch;