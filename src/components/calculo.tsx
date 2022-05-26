import { FC, useEffect, useState } from 'react';
import { useForm, UseFormRegister, useFieldArray , SubmitHandler, UseFieldArrayInsert, FieldArrayWithId } from 'react-hook-form'
import DatosSolicitante from './datos_solicitante';
import SeleccionFechas from './seleccion_fechas';
import SeleccionPeriodo from './seleccion_periodo';
import SeleccionCalculo from './seleccion_calculo';
import SalariesCommissionsTotals from './salarios';
import SumasPromedios from './SumasPromedios';
import Prestaciones from './prestaciones';

export enum Period {
    Monthly = 'mensual',
    Biweekly = 'quincenal',
    Weekly = 'semanal',
    Daily = 'diario',
};

export enum Time {
    aMonth = 30,
    threeMonths = aMonth * 3,
    fiveMonths = aMonth * 5,
    sixMonths = fiveMonths + aMonth,
    sevenMonths = sixMonths + aMonth,
    eightMonths = sevenMonths + aMonth,
    nineMonths = eightMonths + aMonth,
    tenMonths = nineMonths + aMonth,
    elevenMonths = tenMonths + aMonth,
    aYear = 365,
    fiveYears = aYear * 5,
};

export enum Calculation {
    Ordinary = 'ordinario',
    Intermittent = 'intermitente',
};

export interface Salary {
    salary?: number;
    commission?: number;
};

export interface FormData { 
    DNI: string;
    name: string;
    companyName: string;
    inDate: Date;
    outDate: Date;
    period: Period;
    calculation: Calculation;
    salaries: Array<Salary>;
};

export interface FormProps {
    register: UseFormRegister<FormData>;
    fields?: FieldArrayWithId<FormData>[];
    insert?: UseFieldArrayInsert<FormData>;
    completeSalaries?: Function;
    period?: Period;
    setDailySalary?: Function;
};

export interface ResultProps {
    dailySalary?: number;
    daysWorked?: number;
};

const Calculo: FC = () => {
    const {
        control,
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<FormData>();

    const { fields, update } = useFieldArray({control, name: "salaries"});

    const completeSalaries: Function = (index: number) => {
        const salary = fields?.at(index)?.salary;
        const commission = fields?.at(index)?.commission;

        for (let i = index + 1; i < 12; i++)
        {
            update?.(i, {salary, commission});
        }
    };

    const [dailySalary, setDailySalary] = useState<number>();
    const [daysWorked, setDaysWorked] = useState<number>();

    const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
        let date_1 = new Date(data.inDate);
        let date_2 = new Date(data.outDate);

        let diff = date_1.getTime() - date_2.getTime();
        let days = Math.ceil(diff / (1000 * 3600 * 24));
        days = Math.abs(days);
        days++
        setDaysWorked(days);
        console.log(days);
    };

    useEffect(() => {}, [register]);

    return (
    <div className='columns'>
        <form className='column is-full' onSubmit={handleSubmit(onSubmit)}>
            <div className='columns'>
                <div className='column is-half'>
                    <DatosSolicitante register={register}/>
                    <SeleccionFechas register={register}/>
                </div>
                <div className='column is-half'>
                    <SeleccionPeriodo register={register}/>
                    <SeleccionCalculo register={register}/>
                </div>
            </div>

            <div className='columns'>
                <div className='column is-half'>
                    <SalariesCommissionsTotals register={register} fields={fields} completeSalaries={completeSalaries}/>
                </div>
                <div className='column is-half'>
                    <SumasPromedios register={register} setDailySalary={setDailySalary} fields={fields} period={getValues('period')}/>
                    <Prestaciones dailySalary={dailySalary} daysWorked={daysWorked}/>
                    <input className='button is-primary' type="submit" />
                </div>
            </div>
        </form>
    </div>
    );
};

export default Calculo;