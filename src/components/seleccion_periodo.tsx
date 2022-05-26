import { FormProps } from './calculo';

const SeleccionPeriodo = ({register}: FormProps) => {
    return (
    <div>
        <h1 className='title is-4'>Seleccione el período</h1>
        <div className='select'>
            <select {...register("period")}>
                <option value="mensual">Mensual</option>
                <option value="quincenal">Quincenal</option>
                <option value="semanal">Semanal</option>
                <option value="diario">Diario</option>
            </select>
        </div>
    </div>
    );
};

export default SeleccionPeriodo;