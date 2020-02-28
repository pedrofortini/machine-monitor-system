package com.machine.monitor.api.domain.machine.converter;

import com.machine.monitor.api.domain.machine.Machine;
import com.machine.monitor.api.domain.machine.MachineEventLog;
import io.swagger.model.MachineDetailResponse;
import io.swagger.model.MachineEventLogResponse;
import io.swagger.model.MachineResponse;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MachineResponseConverter {

    public List<MachineResponse> convertListMachines(List<Machine> machines){

        return machines.stream().map(m -> convertMachine(m)).collect(Collectors.toList());
    }

    public MachineDetailResponse convertToDetail(Machine machine, List<MachineEventLog> eventLogs){

        MachineDetailResponse detailResponse = new MachineDetailResponse();

        detailResponse.setId(machine.getId());
        detailResponse.setAdminUser(machine.getAdminUser().getLogin());
        detailResponse.setLastDowntime(convertDateTimeToString(machine.getLastDownTime(), "Never"));
        detailResponse.setMachineIsUp(machine.isMachineIsUp());
        detailResponse.setIpAddress(machine.getIpAddress());
        detailResponse.setName(machine.getName());

        List<MachineEventLogResponse> eventLogResponses = eventLogs.stream()
                                                                    .map(e -> convert(e))
                                                                    .collect(Collectors.toList());
        detailResponse.setMachineEventsLog(eventLogResponses);

        return detailResponse;
    }

    public MachineEventLogResponse convert(MachineEventLog eventLog){

        MachineEventLogResponse eventLogResponse = new MachineEventLogResponse();
        eventLogResponse.setType(eventLog.getType().name());
        eventLogResponse.setTimeStamp(convertDateTimeToString(eventLog.getTimeStamp(), ""));

        return eventLogResponse;
    }

    private MachineResponse convertMachine(Machine machine){

        MachineResponse machineResponse = new MachineResponse();
        machineResponse.setId(machine.getId());
        machineResponse.setAdminUser(machine.getAdminUser().getLogin());
        machineResponse.setName(machine.getName());
        machineResponse.setMachineIsUp(machine.isMachineIsUp());
        machineResponse.setIpAddress(machine.getIpAddress());
        machineResponse.setLastDowntime(convertDateTimeToString(machine.getLastDownTime(), "Never"));

        return machineResponse;
    }

    private String convertDateTimeToString(DateTime dateTime, String defaultValue){

        String ret = defaultValue;

        if(dateTime != null){

            DateTimeFormatter fmt = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss");
            ret = fmt.print(dateTime);
        }

        return ret;
    }
}
