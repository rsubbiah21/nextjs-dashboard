 import postgres from 'postgres';

 const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data;
}

async function listInvoiceMaster(){
  const data = await sql`select * from invoices`;
  return data;

}

async function listCustomers() {
  const data = await sql`select * from customers`;
  return data;
}


export async function GET() {
  const result = await listInvoices();
try{
return Response.json(
    { result},
    { status: 200 });


}
catch(e){
return Response.json(
  { error: 'Failed to fetch data' },
  { status: 500 }
);

 }

  

}


// export async function GET() {
//   try 
//   	return Response.json(await listCustomers());
//   } catch (error) {
//   	return Response.json({ error }, { status: 500 });
//   }
// }
