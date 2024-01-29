export function printLog(target: object, propertyName: string, descriptor: PropertyDescriptor) {
    // Store Original Method Implemetation
    const originalMethod = descriptor.value

    // Now, over-write the original method
    descriptor.value = function(...args: any) { 
        const result = originalMethod.apply(this, args)

        //Excute custom logic
        console.log(`-- ${propertyName}() returned: `, result);
        return result
    }
    return descriptor;
}

export function printLogWithMessage(message: string){
    return function(target: object, propertyName: string, descriptor:PropertyDescriptor){
        const originalMethod = descriptor.value

        descriptor.value = function(...args: any) {
            const result = originalMethod.apply(this, args)

            console.log(`${message ? message: 'Function Return'}: ${result}`)
            return result;
        }
    }
}