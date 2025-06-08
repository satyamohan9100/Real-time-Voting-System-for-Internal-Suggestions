from typing import List, Optional, Tuple
from app.database.connection import get_db_connection
from app.models.schemas import SuggestionCreate, SuggestionResponse

class SuggestionOperations:
    @staticmethod
    def get_all_suggestions() -> List[SuggestionResponse]:
        """Fetch all suggestions with vote counts."""
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT s.id, s.title, s.description, s.author, s.created_at,
                       COUNT(v.id) as vote_count
                FROM suggestions s
                LEFT JOIN votes v ON s.id = v.suggestion_id
                GROUP BY s.id, s.title, s.description, s.author, s.created_at
                ORDER BY vote_count DESC, s.created_at DESC
            ''')
            
            rows = cursor.fetchall()
            return [
                SuggestionResponse(
                    id=row[0],
                    title=row[1],
                    description=row[2],
                    author=row[3],
                    vote_count=row[5],
                    created_at=row[4]
                ) for row in rows
            ]

    @staticmethod
    def create_suggestion(suggestion: SuggestionCreate) -> Tuple[int, SuggestionResponse]:
        """Create a new suggestion and return its ID and data."""
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO suggestions (title, description, author) VALUES (?, ?, ?)",
                (suggestion.title, suggestion.description, suggestion.author)
            )
            suggestion_id = cursor.lastrowid
            if suggestion_id is None:
                raise ValueError("Failed to insert suggestion and retrieve its ID.")
            
            # Get the created suggestion with timestamp
            cursor.execute(
                "SELECT id, title, description, author, created_at FROM suggestions WHERE id = ?",
                (suggestion_id,)
            )
            row = cursor.fetchone()
            if row is None:
                raise ValueError("Failed to fetch the created suggestion from the database.")
            
            conn.commit()
            
            suggestion_response = SuggestionResponse(
                id=row[0],
                title=row[1],
                description=row[2],
                author=row[3],
                vote_count=0,
                created_at=row[4]
            )
            
            return suggestion_id, suggestion_response

class VoteOperations:
    @staticmethod
    def toggle_vote(suggestion_id: int, user_id: str) -> Tuple[str, int]:
        """Toggle vote for a suggestion. Returns action and new vote count."""
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            # Check if user already voted
            cursor.execute(
                "SELECT id FROM votes WHERE suggestion_id = ? AND user_id = ?",
                (suggestion_id, user_id)
            )
            existing_vote = cursor.fetchone()
            
            if existing_vote:
                # Remove vote
                cursor.execute(
                    "DELETE FROM votes WHERE suggestion_id = ? AND user_id = ?",
                    (suggestion_id, user_id)
                )
                action = "unvote"
            else:
                # Add vote
                cursor.execute(
                    "INSERT INTO votes (suggestion_id, user_id) VALUES (?, ?)",
                    (suggestion_id, user_id)
                )
                action = "vote"
            
            # Get updated vote count
            cursor.execute(
                "SELECT COUNT(*) FROM votes WHERE suggestion_id = ?",
                (suggestion_id,)
            )
            vote_count = cursor.fetchone()[0]
            
            conn.commit()
            return action, vote_count