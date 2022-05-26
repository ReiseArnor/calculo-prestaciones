import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { ResultProps } from "./calculo";

const Prestaciones = ({dailySalary, daysWorked}: ResultProps) => {
    const [preAviso, setPreAviso] = useState<boolean>(false);
    const [cesantia, setCesantia] = useState<boolean>(false);
    const [vacasiones, setVacasiones] = useState<boolean>(false);
    const [navidad, setNavidad] = useState<boolean>(false);

    const handlePreAvisoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setPreAviso(checked);
    };

    let preAvisoResult = 0;
    if (daysWorked && dailySalary)
    {
        if (daysWorked > 90 && daysWorked < 180)
            preAvisoResult = dailySalary * 7;

    }

    return (
    <div className="content">
        <table>
            <tbody>
                <tr>
                    <td>¿Ha sido usted pre-avisado?</td>
                    <td>
                    <label className="checkbox">
                        <input type="checkbox" defaultChecked={preAviso} onChange={handlePreAvisoChange}/>
                    </label>
                    </td>
                    <td>{preAviso ? preAvisoResult : 0}</td>
                </tr>
            </tbody>
        </table>
        
    </div>
    );
};

export default Prestaciones;