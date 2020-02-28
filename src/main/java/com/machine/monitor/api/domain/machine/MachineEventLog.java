package com.machine.monitor.api.domain.machine;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.joda.time.DateTime;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Table(name = "MachineDownTimeLog")
@EnableAutoConfiguration
public class MachineEventLog implements Serializable {

    private static final long serialVersionUID = -7036796677942451998L;

    @Id
    @GeneratedValue
    @NotNull
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "machine_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Machine machine;

    @Column(name="time_stamp")
    private DateTime timeStamp;

    @Column(name="event_type")
    @Enumerated(EnumType.STRING)
    private MachineEventType type;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Machine getMachine() {
        return machine;
    }

    public void setMachine(Machine machine) {
        this.machine = machine;
    }

    public DateTime getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(DateTime timeStamp) {
        this.timeStamp = timeStamp;
    }

    public MachineEventType getType() {
        return type;
    }

    public void setType(MachineEventType type) {
        this.type = type;
    }
}
