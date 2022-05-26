import PropTypes from 'prop-types'
import { UseFormRegister } from 'react-hook-form';
import { FormData, FormProps } from './calculo';

const DatosSolicitante = ({register}: FormProps) => {

    return (
    <div>
        <h1 className='title is-4'>Datos del solicitante</h1>
        <div className='field'>
            <label className="label">Documento de Identidad</label>
            <div className="control">
            <input className="input is-medium" {...register('DNI', { required: false })} />
            </div>
        </div>

        <div className='field'>
            <label className="label">Nombre</label>
            <div className="control">
            <input className="input is-medium" {...register('name', { required: false })} />
            </div>
        </div>

        <div className='field'>
            <label className="label">Nombre de la Empresa</label>
            <div className="control">
            <input className="input is-medium" {...register('companyName', { required: false })} />
            </div>
        </div>
    </div>
    );
}

export default DatosSolicitante;