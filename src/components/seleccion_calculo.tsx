import { FormProps } from "./calculo";


const SeleccionCalculo = ({register}: FormProps) => {
    return (
    <div>
        <div>
        <h1 className='title is-4'>Seleccione el tipo de cálculo</h1>
        <div className='select'>
            <select {...register("calculation")}>
                <option value="ordinario">Ordinario</option>
                <option value="intermitente">Intermitente</option>
            </select>
        </div>
    </div>
    </div>
    );
};

export default SeleccionCalculo;