package hello;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by david on 25/04/2017.
 */
@Controller
public class AController {

    @RequestMapping("/users")
    public String test(){
        return "test";
    }
}
