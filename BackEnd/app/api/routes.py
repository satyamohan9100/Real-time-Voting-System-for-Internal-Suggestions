from fastapi import APIRouter, HTTPException
from typing import List
from app.models.schemas import (
    SuggestionCreate, 
    SuggestionResponse, 
    VoteRequest, 
    VoteResponse
)
from app.database.operations import SuggestionOperations, VoteOperations
from app.websocket.manager import manager
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.get("/suggestions", response_model=List[SuggestionResponse])
async def get_suggestions():
    """Get all suggestions with vote counts."""
    try:
        suggestions = SuggestionOperations.get_all_suggestions()
        return suggestions
    except Exception as e:
        logger.error(f"Error fetching suggestions: {e}")
        raise HTTPException(status_code=500, detail="Error fetching suggestions")

@router.post("/suggestions")
async def create_suggestion(suggestion: SuggestionCreate):
    """Create a new suggestion."""
    try:
        suggestion_id, suggestion_response = SuggestionOperations.create_suggestion(suggestion)
        
        # Broadcast new suggestion to all clients
        await manager.broadcast({
            "type": "new_suggestion",
            "suggestion": suggestion_response.dict()
        })
        
        return {"message": "Suggestion created", "id": suggestion_id}
    
    except Exception as e:
        logger.error(f"Error creating suggestion: {e}")
        raise HTTPException(status_code=500, detail="Error creating suggestion")

@router.post("/vote", response_model=VoteResponse)
async def vote(vote_data: VoteRequest):
    """Toggle vote for a suggestion."""
    try:
        action, vote_count = VoteOperations.toggle_vote(
            vote_data.suggestion_id, 
            vote_data.user_id
        )
        
        # Broadcast vote update to all clients
        await manager.broadcast({
            "type": "vote_update",
            "suggestion_id": vote_data.suggestion_id,
            "vote_count": vote_count,
            "action": action
        })
        
        return VoteResponse(
            message=f"Vote {action}d",
            vote_count=vote_count,
            action=action
        )
        
    except Exception as e:
        logger.error(f"Error processing vote: {e}")
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}