import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shorten'
})
export class shortenPipe implements PipeTransform{
    transform(value: string, ...args: any[]) {
        if(value.length >= args[0]){
            return value.substring(0, args[0]) + '...';
        }
        return value;
    }
}