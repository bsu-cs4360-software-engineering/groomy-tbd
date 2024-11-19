import {
	Appointment_AddNewAppointment,
	Appointment_DeleteAppointmentByID,
	Appointment_GetAppointmentByID,
	Appointment_GetAppointmentsByCustomerID,
	Appointment_GetAppointmentsByUserID,
	Appointment_UpdateAppointmentByID
} from '$lib/db/database';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, params }) => {
	const data = await request.json();
	const path = params.endpoint;

	try {
		switch (path) {
			case 'create': {
				const result = Appointment_AddNewAppointment(data);
				if (result) {
					return json({ success: true }, { status: 201 });
				} else {
					return json({ success: false, message: 'Error adding appointment' }, { status: 201 });
				}
			}

			case 'delete': {
				const result = Appointment_DeleteAppointmentByID(data);
				if (result) {
					return json({ success: true }, { status: 201 });
				} else {
					return json({ success: false, message: 'Error deleting appointment' }, { status: 201 });
				}
			}

			case 'update': {
				const result = await Appointment_UpdateAppointmentByID(data.id, data);
				console.log(result);
				if (result) {
					return json({ success: true }, { status: 201 });
				} else {
					return json({ success: false, message: 'Error updating appointment' }, { status: 201 });
				}
			}

			case 'getByAppointmentID': {
				const id: number = data;
				const result = Appointment_GetAppointmentByID(id);

				if (result != null) {
					return json({ success: true, message: 'Success', data: result }, { status: 201 });
				} else {
					return json({ success: false, message: 'Error finding appointment', data: undefined }, { status: 201 });
				}
			}

			case 'getByCustomerID': {
				const id: number = data;
				const result = Appointment_GetAppointmentsByCustomerID(id);

				if (result != null) {
					return json({ success: true, message: 'Success', data: result }, { status: 201 });
				} else {
					return json({ success: false, message: 'Error finding appointments', data: undefined }, { status: 201 });
				}
			}

			case 'getByUserID': {
				const id: number = data;
				const result = Appointment_GetAppointmentsByUserID(id);

				if (result != undefined) {
					return json({ success: true, message: 'Success', data: result }, { status: 201 });
				} else {
					return json({ success: false, message: 'Error deleting appointment', data: '' }, { status: 201 });
				}
			}

			default:
				return json({ success: false, message: 'Invalid Endpoint' }, { status: 500 });
		}
	} catch (error) {
		return json({ success: false, message: 'Server Error' }, { status: 500 });
	}
};
