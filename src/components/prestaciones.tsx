import { ChangeEvent, useEffect, useState } from "react";
import { ResultProps, Time} from "./calculo";

const Prestaciones = ({dailySalary, daysWorked}: ResultProps) => {
    const [preAviso, setPreAviso] = useState<boolean>(false);
    const [cesantia, setCesantia] = useState<boolean>(false);
    const [vacaciones, setVacaciones] = useState<boolean>(false);
    const [navidad, setNavidad] = useState<boolean>(false);

    const handlePreAvisoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setPreAviso(checked);
    };

    const handleCesantia = (e: ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setCesantia(checked);
    }

    const handleVacaciones = (e: ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setVacaciones(checked);
    }

    const handleNavidad = (e: ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setNavidad(checked);
    }

    let preAvisoResult: number = 0;
    let preAvisoDays: number = 0;
    if (daysWorked && dailySalary)
    {
        if (daysWorked >= Time.threeMonths && daysWorked < Time.sixMonths)
        {
            preAvisoDays = 7;
            preAvisoResult = dailySalary * preAvisoDays;
        }
            
        else if (daysWorked >= Time.sixMonths && daysWorked < Time.aYear)
        {
            preAvisoDays = 14;
            preAvisoResult = dailySalary * preAvisoDays;
        }
            
        else if (daysWorked >= Time.aYear)
        {
            preAvisoDays = 28;
            preAvisoResult = dailySalary * preAvisoDays;
        }

    }

    let cesantiaResult: number = 0
    let cesantiaDays: number = 0;

    const diasRestantes = (restantes: number) => {
        if (dailySalary) {
            if (restantes >= Time.threeMonths && restantes < Time.sixMonths)
            {
                cesantiaDays += 6;
                let temp_days = 6;
                cesantiaResult += dailySalary * temp_days;
            }
            else if (restantes >= Time.sixMonths && restantes < Time.aYear)
            {
                cesantiaDays += 13;
                let temp_days = 13;
                cesantiaResult += dailySalary * temp_days;
            }
        }
    };

    // TODO: calc the amount before 1992
    if (daysWorked && dailySalary)
    {
        if (daysWorked >= Time.threeMonths && daysWorked < Time.sixMonths)
        {
            cesantiaDays = 6;
            cesantiaResult = dailySalary * cesantiaDays;
        }
        else if (daysWorked >= Time.sixMonths && daysWorked < Time.aYear)
        {
            cesantiaDays = 13;
            cesantiaResult = dailySalary * cesantiaDays;
        }
        else if (daysWorked >= Time.aYear && daysWorked < Time.fiveYears)
        {
            let years = Math.trunc(daysWorked / Time.aYear);
            cesantiaDays = 21 * years;
            cesantiaResult = dailySalary * cesantiaDays;

            let restante = daysWorked - (Time.aYear * years);
            if (restante >= Time.threeMonths)
                diasRestantes(restante);
        }
        else if (daysWorked >= Time.fiveYears)
        {
            let years = Math.trunc(daysWorked / Time.aYear);
            cesantiaDays = 23 * years;
            cesantiaResult = dailySalary * cesantiaDays;

            let restante = daysWorked - (Time.aYear * years);
            if (restante >= Time.threeMonths)
                diasRestantes(restante);
        }

    }

    // no menor de 1 año ni mayor de 5 años, 14 días de salario ordinario
    // despues de 5 años, 18 días de salario ordinario
    let vacacionesResult: number = 0;
    let vacacionesDays: number = 0;

    if (dailySalary && daysWorked)
    {
        if (daysWorked >= Time.fiveMonths && daysWorked < Time.sixMonths){
            vacacionesDays = 6;
            vacacionesResult = dailySalary * vacacionesDays;
        }
        else if (daysWorked >= Time.sixMonths && daysWorked < Time.sevenMonths){
            vacacionesDays = 7;
            vacacionesResult = dailySalary * vacacionesDays;
        }
        else if (daysWorked >= Time.sevenMonths && daysWorked < Time.eightMonths){
            vacacionesDays = 8;
            vacacionesResult = dailySalary * vacacionesDays;
        }
        else if (daysWorked >= Time.eightMonths && daysWorked < Time.nineMonths){
            vacacionesDays = 9;
            vacacionesResult = dailySalary * vacacionesDays;
        }
        else if (daysWorked >= Time.nineMonths && daysWorked < Time.tenMonths){
            vacacionesDays = 10;
            vacacionesResult = dailySalary * vacacionesDays;
        }
        else if (daysWorked >= Time.tenMonths && daysWorked < Time.elevenMonths){
            vacacionesDays = 11;
            vacacionesResult = dailySalary * vacacionesDays;
        }
        else if (daysWorked >= Time.elevenMonths && daysWorked < Time.aYear){
            vacacionesDays = 12;
            vacacionesResult = dailySalary * vacacionesDays;
        }
        else if (daysWorked >= Time.aYear && daysWorked < Time.fiveYears){
            vacacionesDays = 14;
            vacacionesResult = dailySalary * vacacionesDays;
        }
        else if (daysWorked >= Time.fiveYears){
            vacacionesDays = 18;
            vacacionesResult = dailySalary * vacacionesDays;
        }
    }

    const [subTotal, setSubTotal] = useState<number>(preAvisoResult + cesantiaResult + vacacionesResult);
    useEffect(() => {
        let temp_val = 0;
        if (!preAviso)
            temp_val += preAvisoResult;
        if (cesantia)
            temp_val += cesantiaResult;
        if (!vacaciones)
            temp_val += vacacionesResult;

        setSubTotal(temp_val);
    }, [preAviso, cesantia, vacaciones]);
    
    // TODO: how is this calc?
    let navidadResult: number = 0;
    let navidadDays: number = 0;
    if (dailySalary && daysWorked) {

    }

    const [totalRecibir, setTotalRecibir] = useState<number>(subTotal + navidadResult);
    useEffect(() => {
        let temp_val = 0;
        if (subTotal)
            temp_val += subTotal;
        if (navidad)
            temp_val += navidadResult;

        setTotalRecibir(temp_val);
    }, [subTotal, navidad]);

    const getWorkedTime: Function = (workedDays: number) => {
        let years = Math.trunc(workedDays / Time.aYear);
        let months = Math.trunc((workedDays - (Time.aYear * years)) / Time.aMonth);
        let days = workedDays - (Time.aYear * years) - (Time.aMonth * months);

        let temp_string = "";
        if (years)
            temp_string += (years > 1 ? years +" años " : years + " año ");
        if (months)
            temp_string += (months > 1 ? months + " meses " : months + " mes ");
        if (days)
            temp_string += (days > 1 ? days + " días " : days + " día ");

        return temp_string;
    };

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
                    <td>{preAviso ? 0 : preAvisoResult} {preAvisoDays && !preAviso ? "(" + preAvisoDays + " días)": ""}</td>
                </tr>
                <tr>
                    <td>¿Desea incluir cesantía?</td>
                    <td>
                    <label className="checkbox">
                        <input type="checkbox" defaultChecked={cesantia} onChange={handleCesantia}/>
                    </label>
                    </td>
                    <td>{cesantia ? cesantiaResult : 0} {cesantiaDays && cesantia ? "(" + cesantiaDays + " días)": ""}</td>
                </tr>
                <tr>
                    <td>¿Ha tomado las vacaciones correspondientes al último año?</td>
                    <td>
                    <label className="checkbox">
                        <input type="checkbox" defaultChecked={vacaciones} onChange={handleVacaciones}/>
                    </label>
                    </td>
                    <td>{vacaciones ? 0 : vacacionesResult} {vacacionesDays && !vacaciones ? "(" + vacacionesDays + " días)": ""}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>Sub-Total:</td>
                    <td>{subTotal}</td>
                </tr>
                <tr>
                    <td>¿Incluis salario de navidad?</td>
                    <td>
                    <label className="checkbox">
                        <input type="checkbox" defaultChecked={navidad} onChange={handleNavidad}/>
                    </label>
                    </td>
                    <td>{navidad ? navidadResult : 0} {navidadDays && navidad ? "(" + navidadDays + " días)": ""}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>Tiempo laborado:</td>
                    <td>{getWorkedTime(daysWorked)}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>Total a recibir:</td>
                    <td>{totalRecibir}</td>
                </tr>
            </tbody>
        </table>
        
    </div>
    );
};

export default Prestaciones;