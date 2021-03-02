import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/appointmentsRepository'
import { startOfHour } from 'date-fns';

interface Request{
    provider: string;
    date: Date
}

class CreateAppointmentService{

    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository){
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({provider, date}: Request): Appointment{
        
        const appointmentDate = startOfHour(date); 
        
        const findApponintmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);

        if(findApponintmentInSameDate){
            throw Error("This Appointment is already booked");
        }

        const appointment = this.appointmentsRepository.create({
            provider, 
            date: appointmentDate
        });

        return appointment;
    }

}
export default CreateAppointmentService;