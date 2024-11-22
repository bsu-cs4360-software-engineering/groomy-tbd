import type { BaseUserRecord, BaseCustomerRecord, BaseAppointmentRecord, AppointmentRecord, CustomerRecord, UserRecord, BaseNote, Note, ServiceRecord, BaseServiceRecord } from '$lib/types';

interface LoginResponse {
	success: boolean;
	message: string;
	data: UserRecord;
}

interface CustomerArrayResponse {
	success: boolean;
	message: string;
	data: CustomerRecord[];
}

interface CustomerResponse {
	success: boolean;
	message: string;
	data: CustomerRecord;
}

interface AppointmentArrayResponse {
	success: boolean;
	message: string;
	data: AppointmentRecord[];
}

interface AppointmentResponse {
	success: boolean;
	message: string;
	data: AppointmentRecord;
}

interface ServiceResponse {
	success: boolean;
	message: string;
	data: AppointmentRecord;
}

interface ServiceArrayResponse {
	success: boolean;
	message: string;
	data: AppointmentRecord[];
}

interface NoteArrayResponse {
	success: boolean;
	message: string;
	data: Note[];
}

interface NoteResponse {
	success: boolean;
	message: string;
	data: Note | null;
}

interface BaseResponse {
	success: boolean;
	message: string;
}

class API {
	private static defaultHeaders = {
		'Content-Type': 'application/json'
	};

	private static async request(endpoint: string, options: RequestInit = {}) {
		try {
			const baseURL = import.meta.env.VITE_API_URL;
			const response = await fetch(`${baseURL}/api${endpoint}`, {
				...options,
				headers: {
					...this.defaultHeaders,
					...options.headers
				}
			});

			// Return true for DELETE operations (status 204)
			if (response.status === 204) {
				return true;
			}

			return await response.json();
		} catch (error) {
			console.error('API Request failed:', error);
			throw error;
		}
	}

	//Auth
	static async login(credentials: { email: string; password: string }): Promise<LoginResponse> {
		return this.request('/auth/login', {
			method: 'POST',
			body: JSON.stringify(credentials)
		});
	}

	static async signup(data: BaseUserRecord): Promise<BaseResponse> {
		return this.request('/auth/signup', {
			method: 'POST',
			body: JSON.stringify(data)
		});
	}

	//Customer
	static async updateCustomer(data: BaseCustomerRecord): Promise<BaseResponse> {
		return this.request('/customers/update', {
			method: 'POST',
			body: JSON.stringify(data)
		});
	}

	static async deleteCustomer(id: number): Promise<BaseResponse> {
		return this.request('/customers/delete', {
			method: 'POST',
			body: JSON.stringify(id)
		});
	}

	static async createCustomer(data: BaseCustomerRecord): Promise<BaseResponse> {
		return this.request('/customers/create', {
			method: 'POST',
			body: JSON.stringify(data)
		});
	}

	static async getCustomers(userid: number): Promise<CustomerArrayResponse> {
		return this.request('/customers/getCustomersByUserID', {
			method: 'POST',
			body: JSON.stringify(userid)
		});
	}

	static async getCustomerByID(userid: number): Promise<CustomerResponse> {
		return this.request('/customers/getCustomerByUserID', {
			method: 'POST',
			body: JSON.stringify(userid)
		});
	}

	//Appointments
	static async getAppointmentsByUserID(userid: number): Promise<AppointmentArrayResponse> {
		return this.request('/appointments/getByUserID', {
			method: 'POST',
			body: JSON.stringify(userid)
		});
	}

	static async getAppointmentsByCustomerID(customerid: number): Promise<AppointmentArrayResponse> {
		return this.request('/appointments/getByCustomerID', {
			method: 'POST',
			body: JSON.stringify(customerid)
		});
	}

	static async getAppointmentByID(id: number): Promise<AppointmentResponse> {
		return this.request('/appointments/getByAppointmentID', {
			method: 'POST',
			body: JSON.stringify(id)
		});
	}

	static async createAppointment(data: BaseAppointmentRecord): Promise<BaseResponse> {
		return this.request('/appointments/create', {
			method: 'POST',
			body: JSON.stringify(data)
		});
	}

	static async updateAppointment(data: AppointmentRecord): Promise<BaseResponse> {
		return this.request('/appointments/update', {
			method: 'POST',
			body: JSON.stringify(data)
		});
	}

	static async deleteAppointment(id: number): Promise<BaseResponse> {
		return this.request('/appointments/delete', {
			method: 'POST',
			body: JSON.stringify(id)
		});
	}


	//Services
	static async getServicesByUserID(userID: number): Promise<ServiceArrayResponse> {
		return this.request('/services/getServicesByUserID', {
			method: 'POST',
			body: JSON.stringify(userID)
		});
	}

	static async getServiceByID(serviceID: number): Promise<ServiceResponse> {
		return this.request('/services/getServiceByID', {
			method: 'POST',
			body: JSON.stringify(serviceID)
		});
	}

	static async createService(data: BaseServiceRecord): Promise<BaseResponse> {
		return this.request('/services/create', {
			method: 'POST',
			body: JSON.stringify(data)
		});
	}

	static async updateService(data: ServiceRecord): Promise<BaseResponse> {
		return this.request('/services/update', {
			method: 'POST',
			body: JSON.stringify(data)
		});
	}

	static async deleteService(serviceID: number): Promise<BaseResponse> {
		return this.request('/services/delete', {
			method: 'POST',
			body: JSON.stringify(serviceID)
		});
	}

	//Notes

	//Generics
	static async GetNoteByID(noteID: number): Promise<NoteResponse> {
		return this.request('/notes/getNoteByID', {
			method: 'POST',
			body: JSON.stringify(noteID)
		});
	}

	static async UpdateNoteByID(note: Note): Promise<BaseResponse> {
		return this.request('/notes/updateNoteByID', {
			method: 'POST',
			body: JSON.stringify(note)
		});
	}

	static async DeleteNoteByID(noteID: number): Promise<BaseResponse> {
		return this.request('/notes/deleteNoteByID', {
			method: 'POST',
			body: JSON.stringify(noteID)
		});
	}

	//Appointment Notes
	static async createAppointmentNote(appointmentID: number, data: BaseNote): Promise<BaseResponse> {
		return this.request('/notes/createAppointmentNote', {
			method: 'POST',
			body: JSON.stringify([appointmentID, data])
		});
	}

	static async getAppointmentNotes(appointmentID: number): Promise<NoteArrayResponse> {
		return this.request('/notes/getAppointmentNotes', {
			method: 'POST',
			body: JSON.stringify(appointmentID)
		});
	}

	//Customer Notes
	static async createCustomerNote(customerID: number, data: BaseNote): Promise<BaseResponse> {
		return this.request('/notes/createCustomerNote', {
			method: 'POST',
			body: JSON.stringify([customerID, data])
		});
	}

	static async getCustomerNotes(customerID: number): Promise<NoteArrayResponse> {
		return this.request('/notes/getCustomerNotes', {
			method: 'POST',
			body: JSON.stringify(customerID)
		});
	}

	//Service Notes
	static async createServiceNote(serviceID: number, data: BaseNote): Promise<BaseResponse> {
		return this.request('/notes/createServiceNote', {
			method: 'POST',
			body: JSON.stringify([serviceID, data])
		});
	}

	static async getServiceNotes(serviceID: number): Promise<NoteArrayResponse> {
		return this.request('/notes/getServiceNotes', {
			method: 'POST',
			body: JSON.stringify(serviceID)
		});
	}
}

export default API;
