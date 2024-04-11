import { inject } from "@angular/core"
import { UserService } from "./user/user.service"
import { Router } from "@angular/router";


export const CanActivate = ()=>{
    const userService = inject(UserService);
    const router = inject(Router);

    if(userService.IsAuthenticated()){
        return true;
    }else{
        router.navigate(['/login']);
        return false;
    }
}