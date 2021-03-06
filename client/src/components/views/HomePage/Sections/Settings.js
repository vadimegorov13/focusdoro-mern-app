import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { updateSettings } from "../../../../_actions/settings_actions";

import { Modal, Switch, Button, InputNumber, Row, Col, message, Slider, Select } from 'antd';
import { SettingTwoTone } from '@ant-design/icons';

import '../../../stylesheets/settings.css';

const { Option } = Select;

function Settings(props) {
    const dispatch = useDispatch()

    const [Visible, setVisible] = useState(false)
    const [TimerSettings, setSettings] = useState(true)

    const handleSave = () => {
        let variables = {
            duration: props.Duration,
            shortBreak: props.ShortBreak,
            longBreak: props.LongBreak,
            longBreakDelay: props.LongBreakDelay,
            autoStartPomodoro: props.AutoPomodoro,
            autoStartBreak: props.AutoBreak,
            alarmVolume: props.AlarmVolume,
            alarmPlay: props.AlarmPlay,
            alarmSound: props.AlarmSound
        }
        if (props.SettingsId !== "") {
            dispatch(updateSettings(variables, props.SettingsId))
            setVisible(false)
            message.info('Settings Saved')
            props.update()
        } else {
            const json = JSON.stringify(variables)
            localStorage.setItem('Settings', json)
            setVisible(false)
            message.info('Settings Saved')
            props.update()
        }
    }

    const showModal = () => {
        setVisible(true)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    const onChangeDuration = (value) => {
        props.setDuration(value)
    }

    const onChangeShortBreak = (value) => {
        props.setShortBreak(value)
    }

    const onChangeLongBreak = (value) => {
        props.setLongBreak(value)
    }

    const onChangeLongBreakDelay = (value) => {
        props.setLongBreakDelay(value)
    }

    const onChangeAutoPomodoro = () => {
        let autoPomodoro = !props.AutoPomodoro
        props.setAutoPomodoro(autoPomodoro)
    }

    const onChangeAutoBreak = () => {
        let autoBreak = !props.AutoBreak
        props.setAutoBreak(autoBreak)
    }

    const onChangeToTimer = () => {
        setSettings(true)
    }

    const onChangeToNotifications = () => {
        setSettings(false)
    }

    const onChangeAlarmVolume = (event) => {
        props.setAlarmVolume(event)
    }

    const onAfterChangeAlarmVolume = (event) => {
        props.playSound(props.AlarmSound, event)
    }

    const onChangeAlarmPlay = () => {
        let alarmPlay = !props.AlarmPlay
        props.setAlarmPlay(alarmPlay)
    }

    const onChangeAlarmSound = (event) => {
        props.setAlarmSound(event)
        props.playSound(event, props.AlarmVolume)
    }

    const renderSettings = () =>
        <form onSubmit={handleSave}>
            <div className='settings'>
                <div className='change-settings'>
                    <Row >
                        <Col xs={12}>
                            <div onClick={onChangeToTimer} className={TimerSettings ? "settings-active" : "settings-not-active"}>
                                Timer
                            </div>
                        </Col>
                        <Col xs={12}>
                            <div onClick={onChangeToNotifications} className={TimerSettings ? "settings-not-active" : "settings-active"}>
                                Notifications
                            </div>
                        </Col>
                    </Row>
                </div>
                {TimerSettings ?
                    renderTimerSettings()
                    :
                    renderNotificationSettings()
                }
            </div>
        </form>

    const renderTimerSettings = () =>
        <div>
            <div className='setting-container'>
                <label htmlFor='pomodoro-duration'>Pomodoro duration </label>
                <div className='number-input'>
                    <InputNumber min={1} max={100} defaultValue={props.Duration} onChange={onChangeDuration} />
                    <span> in minutes</span>
                </div>
            </div>
            <div className='setting-container'>
                <label htmlFor='pomodoro-duration'>Short break duration </label>
                <div className='number-input'>
                    <InputNumber min={1} max={100} defaultValue={props.ShortBreak} onChange={onChangeShortBreak} />
                    <span> in minutes</span>
                </div>
            </div>
            <div className='setting-container'>
                <label htmlFor='pomodoro-duration'>Long break duration </label>
                <div className='number-input'>
                    <InputNumber min={1} max={100} defaultValue={props.LongBreak} onChange={onChangeLongBreak} />
                    <span> in minutes</span>
                </div>
            </div>
            <div className='setting-container'>
                <label htmlFor='pomodoro-duration'>Long break delay </label>
                <div className='number-input'>
                    <InputNumber min={1} max={100} defaultValue={props.LongBreakDelay} onChange={onChangeLongBreakDelay} />
                    <span> in pomodoros</span>
                </div>
            </div>
            <div className='setting-container'>
                <label htmlFor='pomodoro-duration'>Auto start </label>
                <div className='switch-input'>
                    <Switch
                        defaultChecked={props.AutoPomodoro}
                        onChange={onChangeAutoPomodoro}
                    />
                </div>
            </div>
            <div className='setting-container'>
                <label htmlFor='pomodoro-duration'>Auto break </label>
                <div style={{ flex: 'true', width: '200px', marginTop: '1rem' }}>
                    <Switch
                        defaultChecked={props.AutoBreak}
                        onChange={onChangeAutoBreak}
                    />
                </div>
            </div>
        </div>

    const renderNotificationSettings = () =>
        <div>
            <div className='setting-container'>
                <label htmlFor='pomodoro-duration'>Volume </label>
                <div style={{ flex: 'true', width: '200px', marginTop: '1rem' }}>
                    <Slider 
                    defaultValue={props.AlarmVolume} 
                    disabled={false} 
                    onChange={onChangeAlarmVolume}
                    onAfterChange={onAfterChangeAlarmVolume}
                    />
                </div>
            </div>
            <div className='setting-container'>
                <label htmlFor='pomodoro-duration'>Play alarm sound: </label>
                <div style={{ flex: 'true', width: '200px', marginTop: '1rem' }}>
                    <Switch
                        defaultChecked={props.AlarmPlay}
                        onChange={onChangeAlarmPlay}
                    />
                </div>
            </div>
            {props.AlarmPlay ?
                <div className='setting-container'>
                    <label htmlFor='pomodoro-duration'>Sound </label>
                    <div style={{ flex: 'true', width: '200px', marginTop: '1rem' }}>
                        <Select
                            style={{ width: 200 }}
                            placeholder="Select a sound"
                            value={props.AlarmSound}
                            onChange={onChangeAlarmSound}
                        >
                            <Option value="softBells">Soft Bells</Option>
                            <Option value="demonstrative">Demonstrative</Option>
                            <Option value="eventually">Eventually</Option>
                            <Option value="goesWithoutSaying">Goes Without Saying</Option>
                            <Option value="gotItDone">Got It Done</Option>
                            <Option value="juntos">Juntos</Option>
                            <Option value="longChimeSound">Long Chime Sound</Option>
                            <Option value="pieceOfCake">Piece Of Cake</Option>
                            <Option value="pristine">Pristine</Option>
                            <Option value="slowSpringBoard">Slow Spring Board</Option>
                        </Select>
                    </div>
                </div>
                :
                null
            }
        </div>

    return (
        <div>
            <Button onClick={showModal} type="link">
                <SettingTwoTone
                    style={{ fontSize: '2rem' }}
                    twoToneColor="#6969f5"
                />
            </Button>
            <Modal
                title='Settings'
                centered
                className='modal-container'
                visible={Visible}
                onOk={handleSave}
                onCancel={handleCancel}
                okText="Save"
                cancelText="Cancel"
            >
                {renderSettings()}
            </Modal>
        </div>
    )
}

export default Settings
