from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class SuggestionBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., max_length=1000)
    author: str = Field(..., min_length=1, max_length=100)

class SuggestionCreate(SuggestionBase):
    pass

class SuggestionResponse(SuggestionBase):
    id: int
    vote_count: int
    created_at: str
    
    class Config:
        from_attributes = True

class VoteRequest(BaseModel):
    suggestion_id: int
    user_id: str

class VoteResponse(BaseModel):
    message: str
    vote_count: int
    action: str

class WebSocketMessage(BaseModel):
    type: str
    data: dict

class NewSuggestionMessage(WebSocketMessage):
    type: str = "new_suggestion"
    suggestion: SuggestionResponse

class VoteUpdateMessage(WebSocketMessage):
    type: str = "vote_update"
    suggestion_id: int
    vote_count: int
    action: str