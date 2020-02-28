package com.machine.monitor.api.domain.machine.converter;

import com.machine.monitor.api.application.MessageConstants;
import com.machine.monitor.api.application.exception.UnprocessableEnityException;
import com.machine.monitor.api.domain.machine.Machine;
import com.machine.monitor.api.domain.user.User;
import com.machine.monitor.api.domain.user.UserService;
import io.swagger.model.MachineRequest;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class MachineRequestConverter {

    @Inject
    private UserService userService;

    public Machine convert(MachineRequest request){

        Machine machine = new Machine();

        machine.setName(request.getName());
        machine.setMachineIsUp(request.getMachineIsUp());

        User adminUser = userService.findUserByLogin(request.getAdminUser());
        if(!adminUser.isUserIsAdmin()) {

            throw new UnprocessableEnityException(String.format(MessageConstants.MESSAGE_USER_IS_NOT_ADMIN,
                    request.getAdminUser()));
        }
        machine.setAdminUser(adminUser);
        machine.getUserAcess().add(adminUser);
        machine.setIpAddress(request.getIpAddress());

        return  machine;
    }
}
