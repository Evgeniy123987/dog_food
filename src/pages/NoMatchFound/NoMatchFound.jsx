import { FrownOutlined } from "@ant-design/icons"
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CardContext } from "../../context/cardContext"
import '../NoMatchFound/style.css'

export const NoMatchFound = ()=> {

    const {searchQuery} = useContext(CardContext)

    let navigate = useNavigate()

    return (
    <div className="noMatch">
        <FrownOutlined className="noMatch__smyle" />
        <span className="noMatch__text">{searchQuery ? "По вашему запросу товаров не найдено" : "Не туда попали"}</span>
    </div>
    )
}