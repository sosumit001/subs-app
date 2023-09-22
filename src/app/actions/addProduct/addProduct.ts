'use server'
import prisma from "@/app/lib/prisma"

export async function addProduct (obj: any) {
    
    const {name, description, licensePrice, categories, mlSemiAnnual, mlYearly, referral} = obj;
  
    console.log('categories: ',categories)
    const product = await prisma.products.create({
        data : {
            name,
            description,
            licensePrice,
            mlSemiAnnual,
            mlYearly,
            referral,
            categories: {
                create: categories.map(category => ({
                    name: category.name,
                    oneMonthPrice: category.oneMonthPrice,
                    threeMonthPrice: category.threeMonthPrice,
                    sixMonthPrice: category.sixMonthPrice,
                    OneYearPrice: category.OneYearPrice,
                }))
            }
        }
    });



    return product;
}
