import { Link, useNavigate } from "react-router-dom";

export default function LinkButton({children,to}){
  
    const linkClassName='text-sm text-blue-500 hover:text-blue-700 duration-300';
    const navigate = useNavigate();
    if(to=='-1'){
        return <button className={linkClassName} onClick={() => navigate(-1)}>{children}</button>
    }

    return <Link className={linkClassName} to={to}>&larr; {children}</Link>
}