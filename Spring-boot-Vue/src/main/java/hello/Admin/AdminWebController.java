package hello.Admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by david on 26/04/2017.
 */
@Controller
public class AdminWebController {

    @RequestMapping("/admin")
    public String get() {
        return "admin/home";
    }

    @RequestMapping("/admin/{extension}")
    public String get(@PathVariable String extension) {
        return "admin/home";
    }

}
