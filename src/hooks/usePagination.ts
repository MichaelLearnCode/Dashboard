import { useState } from "react";

function usePagination<T>(data: T[]){
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSize, setCurrentSize] = useState<number>(5);
    const handlePageChange = (page:number, pageSize:number)=>{
        if(page !== currentPage)setCurrentPage(page);
        if (pageSize !== currentSize)setCurrentSize(pageSize);
    }
    const paginatedData = data.slice((currentPage - 1) * currentSize, currentPage * currentSize);
    return {currentPage, currentSize,handlePageChange,paginatedData}
}
export default usePagination;