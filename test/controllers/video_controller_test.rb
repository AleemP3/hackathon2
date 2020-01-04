require 'test_helper'

class VideoControllerTest < ActionDispatch::IntegrationTest
  test "should get api/auth" do
    get video_api/auth_url
    assert_response :success
  end

end
