
export interface MessageContentType{
    id:string;
    role:string;
    content:string;
    model:string;
    type:string;
    edited:boolean; 
    parentId:string;
    childrenId:string[];
    files:string[];
    createdAt:string;
    updatedAt:string;
}
export interface MessagesType {
  messages: MessageContentType[];
  content_type: string;
}

export interface MessagesType {
  id: number;
  conversationId: number;
  role: string;
  content: MessagesType;
  parentMessageId: number | null;
  feedBack: any; // 或 null，或定义具体 Feedback 接口
  remark: string | null;
  createdAt: string;
  updatedAt: string;
}

