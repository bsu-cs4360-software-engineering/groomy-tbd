import { Customer_GetCustomerByID, Customer_UpdateCustomerByID } from "$lib/db/database";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { customerRecord } from "$lib/types";

export const load:PageServerLoad = async ({params,url}) =>{
    let customerID = params.slug
    let editView = url.searchParams.get("edit") ? true: false

    const result = await Customer_GetCustomerByID(customerID)
    if(result != null){
        return {
            customerInfo: JSON.stringify(result),
            editView: JSON.stringify(editView)
        }
    } else {
        redirect(302,"/home/customers")
    }
}