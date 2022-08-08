import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import { Moment } from 'moment';
import React, { FC, useState } from 'react';
import { useTypeSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvent';
import { IUser } from '../models/User';
import { formatDate } from '../utils/date';
import { rules } from '../utils/rules';

interface EventFormProps {
   quests: IUser[],
   submit: (event: IEvent) => void
}

const EventForm: FC<EventFormProps> = (props) => {
   const { user } = useTypeSelector(state => state.authReduser)

   const [event, setEvent] = useState<IEvent>({
      author: '',
      date: '',
      description: '',
      quest: ''
   } as IEvent)

   const selectDate = (date: Moment | null) => {
      if (date) {
         setEvent({ ...event, date: formatDate(date.toDate()) })
      }
   }

   const submitForm = () => {
      props.submit({ ...event, author: user.username })
   }

   return (
      <Form onFinish={submitForm}>
         <Form.Item
            label="Описание события"
            name="description"
            rules={[rules.required('Обязательное поле')]}
         >
            <Input
               value={event.description}
               onChange={e => setEvent({ ...event, description: e.target.value })}
            />
         </Form.Item>
         <Form.Item
            label="Дата события"
            name="data"
            rules={[rules.required('Обязательное поле')]}
         >
            <DatePicker
               onChange={(date) => selectDate(date)}
            />
         </Form.Item>
         <Form.Item
            label="Выберите гостя"
            name="quest"
            rules={[rules.required('Обязательно поле')]}
         >
            <Select onChange={(quest: string) => setEvent({ ...event, quest })}>
               {props.quests.map(quest =>
                  <Select.Option key={quest.username} value={quest.username}>
                     {quest.username}
                  </Select.Option>
               )}
            </Select>
         </Form.Item>
         <Row justify='end'>
            <Form.Item>
               <Button type="primary" htmlType="submit">
                  Создать
               </Button>
            </Form.Item>
         </Row>
      </Form>
   );
}

export default EventForm;