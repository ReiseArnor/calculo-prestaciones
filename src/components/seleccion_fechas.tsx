import { FormProps} from './calculo'

const SeleccionFechas = ({register}: FormProps) => {
    return (
    <div>
        <h1 className='title is-4'>Selección de fechas</h1>
        <div className='field'>
            <label className="label">Fecha de ingreso</label>
            <div className="control">
            <input className="input is-medium" {...register('inDate', { required: false })} type='date' />
            </div>
        </div>

        <div className='field'>
            <label className="label">Fecha de salida</label>
            <div className="control">
            <input className="input is-medium" {...register('outDate', { required: false })} type='date' />
            </div>
        </div>
    </div>
    );
};

export default SeleccionFechas;